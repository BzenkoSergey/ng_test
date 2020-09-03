import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TTSFieldComponent } from './field.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		TTSFieldComponent
	],
	exports: [
		TTSFieldComponent
	]
})

export class TTSFieldModule {}
