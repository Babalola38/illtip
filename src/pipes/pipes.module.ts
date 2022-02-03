import { NgModule } from '@angular/core';
//import { LinksPipe } from './links/links';
import { WeblinkPipe } from './weblink/weblink';
import { WeblinkotherPipe } from './weblinkother/weblinkother';
import { TimearrangePipe } from './timearrange/timearrange';

@NgModule({
	declarations: [
        //LinksPipe,
    // WeblinkPipe,
    WeblinkotherPipe,
    TimearrangePipe],
	imports: [],
	exports: [
        //LinksPipe,
    // WeblinkPipe,
    WeblinkotherPipe,
    TimearrangePipe]
})
export class PipesModule {}
