import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the LinksPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'linkify',
})

export class LinksPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  replacePattern1 = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  //replacedText = plainText.concat(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  //replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
  
  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  //replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
  transform(link: string, ...args) {
    return this.linkify(link);
    
    
  }
  private linkify(plainText): string{
    console.log(plainText)
    let replacedText;
    if (plainText.match(this.replacePattern1)) {
      replacedText = plainText.replace(this.replacePattern1, function replacer($1, $2, $3) {
              let url: any = $1;
              let url2:any=$2
               console.log('url1', $3,$1,$2)
              if(url2==undefined){
                let urlClean: any = url.replace("" + $3 + "://", "");
                console.log('url1', urlClean)
                return "<a href=\"" +'http://'+url + "\" target=\"_blank\">" + urlClean + "</a>";
              }else{
                let urlClean: any = url.replace("" + $3 + "://", "");
               console.log('url2', urlClean)
                return "<a href=\"" + url + "\" target=\"_blank\">" + urlClean + "</a>";
              }

             
      });
}

else if (plainText.match(this.replacePattern3)) {
  replacedText = plainText.replace(this.replacePattern3, "<a href=\"mailto:$1\">$1</a>");
}
else{
  replacedText=plainText
}


//console.log(replacedText)
return replacedText;
   }
}
