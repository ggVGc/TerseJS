// This is a ridulous mess...
macro (..){
  case infix{ $name:expr | _ {$rest... .. {$kuk...} $apa...} } => {
    return #{
      $name .. {$rest...} .. {$kuk...};
      $name .. {$apa...};
    }
  }


  case infix{ $name:expr | _ {$rest...} } => {
    var here = #{ here };
    function go(name, ss) {
      var i, a = [];
      for(i=0;i<ss.length;++i){
        var s = ss[i],
            n = i<ss.length-1?ss[i+1]:null,
            n2 = i<ss.length-2?ss[i+2]:null,
            p = i>0?ss[i-1]:null;
            pp = i>1?ss[i-2]:null;

        if (s.token.type===parser.Token.Punctuator && s.token.value === '.'
           && (!p || p.token.type === parser.Token.Punctuator)) {
          ss[i] = name;
          if(n && n.token.type == parser.Token.Identifier){
            ss.splice(i+1, 0, makePunc('.', here));
            i++;
            continue;
          }
        }
        if (s.token.type === parser.Token.Delimiter) {
          /*
          var nm = name;
          if(p && p.token.value === '...'){
            if(pp){
              nm = pp;
            }
          }
          */
          s.expose();
          s.token.inner = go(name, s.token.inner);
          ss[i] = s;
        }
      }
      return ss;
    }
    var ret = go(
      makeDelim('()', unwrapSyntax(#{$name}).inner, here),
      #{$rest...});
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


export (..)
