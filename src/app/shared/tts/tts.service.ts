import { Injectable, OnDestroy } from '@angular/core';

import { Subject, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { GoogleTTSService } from './google-tts.service';

@Injectable()
export class TTSService implements OnDestroy {
	private playing = new Subject<boolean>();
	private canPlay = new BehaviorSubject<boolean>(false);
	private text = '';

	constructor(private googleTTSService: GoogleTTSService) {}

	ngOnDestroy() {
		this.playing.complete();
		this.canPlay.complete();
		this.text = '';
	}

	getCanPlayStream() {
		return this.canPlay.asObservable()
			.pipe(
				distinctUntilChanged()
			);
	}

	getPlayingStream() {
		return this.playing.asObservable();
	}

	setText(text: string) {
		this.text = text;
		this.canPlay.next(!!text);
	}

	play(speed: number, voice: string) {
		this.playing.next(true);
		return this.googleTTSService.run(this.text, speed, voice);
	}

	stop() {
		this.playing.next(false);
	}

	getVoices() {
		return this.googleTTSService.getVoices();
	}
}
