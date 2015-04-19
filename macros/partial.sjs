
// Depends on underscore.js

let (~) = macro {
  case infix{ $func:expr | $ctx $args:expr (,) ...} => {
    letstx $underscore = [makeIdent('_', #{$ctx})];
    return #{$underscore.partial($func, $args (,) ...)}
  }
}

export (~)
