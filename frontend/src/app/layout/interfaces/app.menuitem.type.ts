import { IsActiveMatchOptions, UrlCreationOptions } from '@angular/router';

export interface AppMenuitemType extends UrlCreationOptions {
	label?: string;
	url?: string;
	class?: string;
	badgeClass?: string;
	icon?: string;
	material?: string;
	target?: HtmlLinkTarget;
	skipLocationChange?: HtmlOptionalBoolean;
	replaceUrl?: HtmlOptionalBoolean;
	routerLinkActiveOptions?: { exact: boolean; } | IsActiveMatchOptions;
	state?: { [k: string]: any; };
	routerLink?: string[];
	separator?: boolean;
	disabled?: boolean;
	visible?: boolean;
	command?: (arg: { originalEvent: Event, item: AppMenuitemType }) => void;
	items?: AppMenuitemType[];
}

type HtmlOptionalBoolean = boolean | string | null | undefined;

type HtmlLinkTarget = '_blank' | '_self' | '_parent' | '_top' | string | null | undefined;
