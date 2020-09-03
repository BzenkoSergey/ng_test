import { Component } from '@angular/core';

import { TTSService } from './../tts.service';

@Component({
	selector: 'app-tts-field',
	templateUrl: './field.html',
	styleUrls: ['./field.scss']
})

export class TTSFieldComponent {
	hasNonLatinCharacters = false;

	constructor(private ttsService: TTSService) {}

	setValue(value: string) {
		this.hasNonLatinCharacters = !this.includesOnlyLatinCharacters(value);
		if (this.hasNonLatinCharacters) {
			this.ttsService.setText('');
		} else {
			this.ttsService.setText(value);
		}
	}

	private includesOnlyLatinCharacters(text: string) {
		return !text.match(/[^\u0020-\u007F\u2019]+/gi);
	}
}
