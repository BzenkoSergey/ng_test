import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TTSControllersComponent } from './controllers.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		TTSControllersComponent
	],
	exports: [
		TTSControllersComponent
	]
})

export class TTSControllersModule {}
