macro @ {
  rule {$val:ident} => {
     self.ident
  }
  rule { = $val:expr} => {
     self = $val
  }
}

export @
