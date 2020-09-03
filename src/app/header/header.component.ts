import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.html',
	styleUrls: ['./header.scss']
})

export class HeaderComponent {
	@ContentChild('controls') controls: TemplateRef<HTMLDivElement>;
}
