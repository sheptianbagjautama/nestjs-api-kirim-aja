import { SetMetadata } from "@nestjs/common";

export const PERMISSION_KEY = 'permission';

//decorator untuk menetapkan permission yang dibutuhkan pada route handler atau controller
export const RequirePermissions = (...permissions:string[]) => {
    return SetMetadata(PERMISSION_KEY, permissions);
}

//decorator untuk menetapkan permission dengan tipe 'any' pada route handler atau controller
export const RequireAnyPermission = (...permissions:string[]) => {
    return SetMetadata(PERMISSION_KEY, { type:'any', permissions });
}

//decorator untuk menetapkan permission dengan tipe 'all' pada route handler atau controller
export const RequireAllPermissions = (...permissions:string[]) => {
    return SetMetadata(PERMISSION_KEY,{ type: 'all', permissions });
}
