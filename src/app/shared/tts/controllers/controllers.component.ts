import { Component, OnDestroy, OnInit } from '@angular/core';

import { TTSService } from './../tts.service';

@Component({
	selector: 'app-tts-controllers',
	templateUrl: './controllers.html',
	styleUrls: ['./controllers.scss']
})

export class TTSControllersComponent implements OnInit, OnDestroy {
	private audioElement = new Audio();
	private audioListener = () => this.stop();

	voices: string[] = [];
	speedList = this.genSpeedList();
	selectedSpeed = this.speedList[0];
	selectedVoice: string|null = null;
	isPlaying = this.ttsService.getPlayingStream();
	canPlay = this.ttsService.getCanPlayStream();

	constructor(
		private ttsService: TTSService
	) {}

	ngOnInit() {
		this.audioElement.addEventListener('ended', this.audioListener);
		this.ttsService.getVoices()
			.subscribe(voices => {
				this.voices = voices;
				this.selectedVoice = voices[0];
			});
	}

	ngOnDestroy() {
		this.audioElement.removeEventListener('ended', this.audioListener);
		this.audioListener = null;
		this.audioElement = null;
		this.selectedVoice = null;
		this.selectedSpeed = null;
		this.voices = [];
		this.speedList = [];
	}

	changeVoice(voice: string) {
		this.selectedVoice = voice;
	}

	changeSpeed(speed: number) {
		this.selectedSpeed = speed;
	}

	play() {
		this.ttsService.play(this.selectedSpeed, this.selectedVoice)
			.subscribe(d => {
				this.audioElement.src = d;
				this.audioElement.play();
			});
	}

	stop() {
		this.ttsService.stop();
		this.audioElement.pause();
	}

	private genSpeedList() {
		const minValue = 1;
		const maxValue = 4;
		const gaps = maxValue - minValue;
		const listSize = 5;
		const gap = gaps / (listSize - 1);

		return Array
			.from({ length: listSize })
			.map((_value, i) => minValue + (i * gap));
	}
}
