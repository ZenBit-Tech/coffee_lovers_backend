import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '@/modules/user/user.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import UserDto from './dto/user.dto';
import PasswordResetDto from './dto/password-reset.dto';
import PasswordResetRequestDto from './dto/password-reset-request.dto';
import SetProfileImageDto from './dto/set-profile-image.dto';
import AddUserEducationDto from './dto/add-user-education.dto';
import AddUserWorkhistoryDto from './dto/add-user-workhistory.dto';
import { User } from '@/common/entities/User.entity';
import { Category } from '@/common/entities/Category.entity';
import { ReqUser } from './dto/get-user-dto.dto';
import AddUserInfoDto from './dto/add-user-info.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'get information about current user' })
  @ApiResponse({ type: UserDto })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  @Get('')
  getUserInformation(@Request() req: ReqUser): UserDto {
    return req.user;
  }

  @ApiOperation({ summary: 'send mail for password reset' })
  @Post('passwordresetrequest')
  @HttpCode(HttpStatus.OK)
  passwordResetRequest(@Body() dto: PasswordResetRequestDto): Promise<void> {
    return this.userService.sendPasswordResetMail(dto);
  }

  @ApiOperation({ summary: "reset user's password" })
  @Post('passwordreset')
  @HttpCode(HttpStatus.OK)
  passwordReset(@Body() dto: PasswordResetDto): Promise<void> {
    return this.userService.resetPassword(dto);
  }

  @ApiOperation({ summary: 'set profile image for user' })
  @ApiResponse({ type: SetProfileImageDto })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('setprofileimage')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @HttpCode(HttpStatus.OK)
  setProfileImage(
    @UploadedFile() avatar: Express.Multer.File,
    @Request() req: ReqUser,
  ): Promise<SetProfileImageDto> {
    return this.userService.setProfileImage(avatar, req.user);
  }

  @ApiOperation({ summary: 'sent user information' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @Put('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  addUserInfo(@Request() req, @Body() payload: AddUserInfoDto): Promise<void> {
    return this.userService.addUserInfo(payload, req.user);
  }

  @ApiOperation({ summary: 'sent education information' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @Post('education-info')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  addEducationInfo(
    @Request() req,
    @Body() payload: AddUserEducationDto[],
  ): Promise<void> {
    return this.userService.addEducationInfo(payload, req.user);
  }

  @ApiOperation({ summary: 'sent workhistory information' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @Post('workhistory-info')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  addWorkhistoryInfo(
    @Request() req,
    @Body() payload: AddUserWorkhistoryDto[],
  ): Promise<void> {
    return this.userService.addWorkhistoryInfo(payload, req.user);
  }

  @ApiOperation({ summary: 'Get user information' })
  @ApiResponse({ type: UserDto })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/freelancer')
  getFreelancerInformation(
    @Query('search') search: string,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number = 10,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  ): Promise<[User[], number]> {
    return this.userService.getFheelancerInformation(take, page, search);
  }

  @ApiOperation({ summary: 'Add new category for user or set category' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @Post('category')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  addCategoryInfo(
    @Request() req: ReqUser,
    @Body() payload: Category,
  ): Promise<void> {
    return this.userService.addCategoryInfo(payload, req.user);
  }

  @ApiOperation({ summary: 'Get all available categories' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @Get('category')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getCategories(): Promise<Category[]> {
    return this.userService.getCategoryInfo();
  }
}
