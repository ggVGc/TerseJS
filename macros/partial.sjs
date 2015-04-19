
// Depends on underscore.js

let partial = macro {
  case {_ ($func:expr) (($vals:expr (,) ...))} => {
    letstx $underscore = [makeIdent('_', #{$func})];
    return #{$underscore.partial($func, $vals (,) ...)}
  }
  case {_ ($func:expr) ($val:expr)} => {
    letstx $underscore = [makeIdent('_', #{$func})];
    return #{$underscore.partial($func, $val)}
  }
}

operator (~) 5 left { $lhs, $rhs } => #{ partial $lhs $rhs }

export (~)
