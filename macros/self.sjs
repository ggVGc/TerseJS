macro @ {
  rule {$val:ident} => {
     self.$val
  }
  rule { = $val:expr} => {
     self = $val
  }
}

export @
