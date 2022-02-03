import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the WeblinkPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'weblinky',
})
export class WeblinkPipe implements PipeTransform {
  webaddress1 = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  //replacedText = plainText.concat(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  webaddress2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  webaddress3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  //replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

  transform(weblink: string, ...args) {
    return  this.weblinky(weblink);
  }

  private weblinky(address:any){
   let replacedaddress;
  if (this.webaddress1.test(address)) {
  replacedaddress = address.replace(this.webaddress1, function replacer($1, $2, $3) {
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
}else if(this.webaddress3.test(address)){
  replacedaddress = address.replace(this.webaddress3, "<a href=\"mailto:$1\">$1</a>");
}else{
  replacedaddress = address
}
console.log(replacedaddress)
return replacedaddress;
}

}
