import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('https://war-track.gitbook.io/war-track-api/')
  home() {}
}
