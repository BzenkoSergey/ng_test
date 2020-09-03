import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class GoogleTTSService implements OnDestroy {
	private privateKey = 'AIzaSyBUrG7YyqBHH-TcgwACamVt3mlNU2u5dR4';
	private apiUrl = 'https://texttospeech.googleapis.com/v1';
	private synthesizeCacheKey: string|null = null;
	private synthesizeCacheValue: string|null = null;
	private languageCode = 'en-US';
	private audioEncoding = 'MP3';
	private requestOptions = {
		headers: {
			'X-Goog-Api-Key': this.privateKey
		}
	};

	constructor(private http: HttpClient) {}

	ngOnDestroy() {
		this.synthesizeCacheKey = null;
		this.synthesizeCacheValue = null;
	}

	run(text: string, speed: number, voice: string) {
		const nextSynthesizeCacheKey = `${text}_${voice}_${speed}`;
		if (this.synthesizeCacheKey === nextSynthesizeCacheKey) {
			return of(this.synthesizeCacheValue);
		}

		const url = `${this.apiUrl}/text:synthesize`;
		return this.http.post<{ audioContent: string }>(
			url,
			{
				audioConfig: {
					audioEncoding: this.audioEncoding,
					speakingRate: speed
				},
				voice: {
					languageCode: this.languageCode,
					name: voice
				},
				input: {
					text
				}
			},
			this.requestOptions
		)
		.pipe(
			map(({ audioContent }) => `data:audio/mp3;base64,${audioContent}`),
			tap(audioContent => {
				this.synthesizeCacheKey = nextSynthesizeCacheKey;
				this.synthesizeCacheValue = audioContent;
			})
		);
	}

	getVoices() {
		const url = `${this.apiUrl}/voices`;
		return this.http.get<{ voices: { name: string }[] }>(
			url,
			{
				...this.requestOptions,
				params: {
					languageCode: this.languageCode
				}
			}
		)
		.pipe(
			map(({ voices }) => {
				return voices.map(({ name }) => name);
			})
		);
	}
}
