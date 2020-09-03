import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TTSControllersModule } from './controllers/controllers.module';
import { TTSFieldModule } from './field/field.module';
import { GoogleTTSService } from './google-tts.service';
import { TTSService } from './tts.service';

@NgModule({
	imports: [
		HttpClientModule
	],
	providers: [
		GoogleTTSService,
		TTSService
	],
	exports: [
		TTSControllersModule,
		TTSFieldModule
	]
})

export class TTSModule {}
