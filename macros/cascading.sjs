// This is a ridulous mess...
macro ($){
  case infix{ $name:expr | _ {$rest...} } => {
    var here = #{ here };
    var name = makeDelim('()', unwrapSyntax(#{$name}).inner, here);
    function go(ss) {
      var i, a = [];
      for(i=0;i<ss.length;++i){
        var s = ss[i],
            n = i<ss.length-1?ss[i+1]:null,
            n2 = i<ss.length-2?ss[i+2]:null;

        if(n && n.token.value === '$'){
          return ss;
        }
        if (n && n.token.type === s.token.type && s.token.type===parser.Token.Punctuator
            && n.token.value === s.token.value && s.token.value === '.') {
          ss[i] = name;
          if(n2===null ||n2.token.type !== parser.Token.Identifier){
            ss.splice(i+1, 1);
          }
        }
        if (s.token.type === parser.Token.Delimiter) {
          s.expose();
          s.token.inner = go(s.token.inner);
          ss[i] = s;
        }
      }
      return ss;
    }
    var ret = go(#{$rest...});
    return ret;
  }
}


/*
macro ($){
  rule infix{ $name:expr | {$rest...} } => {
    macro (..){
      case {$ctx $iname:ident} => {
        return #{ $name.$iname }
      }
      case {$ctx} => {
        return #{
          $name
        }
      }
    }
    $rest...
  }
}
*/


export ($)
