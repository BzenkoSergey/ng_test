import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HeaderModule } from './header/header.module';
import { TTSModule } from './shared/tts/tts.module';
import { AppComponent } from './app.component';

@NgModule({
	imports: [
		BrowserModule,
		HeaderModule,
		TTSModule
	],
	providers: [],
	declarations: [
		AppComponent
	],
	bootstrap: [
		AppComponent
	]
})

export class AppModule {}
