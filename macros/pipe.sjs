macro thread {
    rule { $val ($prop:ident . $rest ...) } => {
       $prop. thread $val ($rest ...)
    }
    rule { $val ($prop:ident()) } => {
        $prop($val)
    }
    rule { $val ($prop:ident) } => {
        $prop($val)
    }
    rule { $val ($prop:ident($args:expr (,) ...)) } => {
        $prop($args (,) ... , $val) 
    }
}

operator (|>) 4 left { $lhs, $rhs } => #{ thread $lhs $rhs }

export (|>)
