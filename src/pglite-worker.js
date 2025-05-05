import { PGlite } from '@electric-sql/pglite'
import { worker } from '@electric-sql/pglite/worker'
import { OpfsAhpFS } from '@electric-sql/pglite/opfs-ahp'

worker({
  async init() {
    return new PGlite({
        fs: new OpfsAhpFS('docsys'),
    })
  },
})