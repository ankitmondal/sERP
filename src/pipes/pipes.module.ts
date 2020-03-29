import { NgModule } from '@angular/core';
import { ItemTransformPipe } from './item-transform/item-transform';
import { SplitPipe } from "../pipes/item-transform/split-transform"
@NgModule({
	declarations: [ItemTransformPipe,SplitPipe],
	imports: [],
	exports: [ItemTransformPipe,SplitPipe]
})
export class PipesModule {}
