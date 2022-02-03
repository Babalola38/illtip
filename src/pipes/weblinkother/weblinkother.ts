import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the WeblinkotherPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'weblinkother',
})
export class WeblinkotherPipe implements PipeTransform {
  
  webaddress4 = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  //replacedText = plainText.concat(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  webaddress5 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  webaddress6 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  //replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

  transform(weblink2: string, ...args) {
    return  this.weblinkother(weblink2);
  }

  private weblinkother(address2:any){
   let replacedaddress2;
  if (this.webaddress4.test(address2)) {
  replacedaddress2 = address2.replace(this.webaddress4, function replacer($1, $2, $3) {
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
}else if(this.webaddress6.test(address2)){
  replacedaddress2 = address2.replace(this.webaddress6, "<a href=\"mailto:$1\">$1</a>");
}else{
  replacedaddress2 = address2
}
console.log(replacedaddress2)
return replacedaddress2;
}

}
