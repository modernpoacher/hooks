import debug from 'debug'

import {
  hasStagedChanges,
  getGitRemoteShowOriginHeadBranch,
  hasGitDiffHeadPackageVersionChanges,
  patchPackageVersion
} from '#hooks/common'

const log = debug('@modernpoacher/hooks:post-commit')
const error = debug('@modernpoacher/hooks:post-commit:error')

log('`@modernpoacher/hooks` is awake')

export default async function postCommit () {
  log('postCommit')

  try {
    if (await hasStagedChanges()) return

    if (await hasGitDiffHeadPackageVersionChanges(await getGitRemoteShowOriginHeadBranch())) return

    await patchPackageVersion()
  } catch ({
    code = 'NONE',
    message = 'No error message defined'
  }) {
    error({ code, message })
  }
}
