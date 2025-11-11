import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guards/logged-in.guard';
import { BaseResponse } from 'src/common/interface/base-response.interface';
import { ProfileResponse } from './response/profile.response';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }


  @Get()
  async findOne(@Req() req: Request & { user?: any }): Promise<BaseResponse<ProfileResponse>> {
    console.log("testtt",await this.profileService.findOne(req.user.id))
    return {
      message: 'Profile retrieved successfully',
      data: await this.profileService.findOne(req.user.id)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }
}
