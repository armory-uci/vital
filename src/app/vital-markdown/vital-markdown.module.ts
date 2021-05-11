import { NgModule, SecurityContext } from '@angular/core';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

const markedOptionsFactory = (): MarkedOptions => {
  return {
    smartLists: true,
    smartypants: true
  };
};

@NgModule({
  imports: [
    MarkdownModule.forRoot({
      // We're going to write the content. Let's hope we don't XSS ourselves :D
      sanitize: SecurityContext.NONE,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory
      }
    })
  ],
  exports: [MarkdownModule]
})
export class VitalMarkdownModule {}
