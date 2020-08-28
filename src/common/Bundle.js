import { useEffect, useState } from 'react'
import Load from '../Layout/Loading'
import React from 'react'

export default function(props) {
  let [mod, setMod] = useState(<Load />)
  useEffect(() => props.load(m => setMod(props.children(m.default))), [])
  return mod
}
