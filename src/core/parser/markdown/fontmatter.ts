import matter from 'gray-matter'
import { unflatten, flatten } from 'flat'

export function stringify(data: any, content: string = '') {
  // flatten frontmatter data
  // convert `parent: { child: ... }` into flat keys `parent.child`
  data = flatten(data, {
    // preserve arrays and their contents as is and do not waltk through arrays
    // flatten array will be like `parent.0.child` and `parent.1.child` with is not readable
    safe: true
  })

  return matter.stringify(content, data)
}

export function parse(file) {
  const { data, content, ...rest } = matter(file, { excerpt: true, excerpt_separator: '<!--more-->' })

  // unflatten frontmatter data
  // convert `parent.child` keys into `parent: { child: ... }`
  const unflattenData = unflatten(data || {}, {
    // preserve arrays and their contents as is and do not waltk through arrays
    safe: true
  })

  return {
    content,
    data: unflattenData,
    ...rest
  }
}
