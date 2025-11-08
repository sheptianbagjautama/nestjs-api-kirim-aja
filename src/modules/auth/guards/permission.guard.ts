import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionsService } from "src/modules/permissions/permissions.service";
import { PERMISSION_KEY } from "../decorators/permissions.decorator";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector:Reflector, //untuk mengambil metadata dari decorator
        private permissionService:PermissionsService //untuk mengakses service permission
    ) {}

    //fungsi untuk mengecek apakah user memiliki permission yang dibutuhkan
    async canActivate(context:ExecutionContext):Promise<boolean> {
        //untuk mengambil metadata permission dari decorator
        const requiredPermissions = this.reflector.getAllAndOverride(
            PERMISSION_KEY,
            [context.getHandler(), context.getClass()], //mengambil metadata dari handler dan class
        );

        if(!requiredPermissions){
            return true; //jika tidak ada permission yang dibutuhkan, maka izinkan akses
        }

        const request = context.switchToHttp().getRequest(); //mengambil request dari context
        const user = request.user; //mengambil user dari request

        if(!user){
            //jika tidak ada user, maka lempar exception
            throw new ForbiddenException('User not authenticated');
        }

        //cek tipe permission yang dibutuhkan
        if(typeof requiredPermissions == 'object' && requiredPermissions.type){
            const { type, permissions} = requiredPermissions;

            let hasPermission = false;

            if(type === 'any') {
                //cek apakah user memiliki salah satu permission yang dibutuhkan
                hasPermission = await this.permissionService.userHasAnyPermission(
                    user.id,
                    permissions
                );
            } else if(type === 'all') {
                //cek apakah user memiliki semua permission yang dibutuhkan
                hasPermission = await this.permissionService.userHasAllPermissions(
                    user.id,
                    permissions
                );
            }

            if(!hasPermission){
                throw new ForbiddenException(`Access denied. Required permissions:${permissions.join(', ')}`);
            }
        } else {
            const permissions = Array.isArray(requiredPermissions) 
            ? requiredPermissions: [requiredPermissions];

            const hasPermission = await this.permissionService.userHasAllPermissions(
                user.id,
                permissions
            );

            if(!hasPermission){
                throw new ForbiddenException(`Access denied. Required permissions: ${permissions.join(', ')}`);
            }
        }

        return true; //jika user memiliki permission yang dibutuhkan, maka izinkan akses
    }
}