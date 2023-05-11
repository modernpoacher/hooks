import debug from 'debug'

import {
  hasStagedChanges,
  getGitRemoteShowOriginHeadBranch,
  getGitRevParseAbbrevRefHead,
  hasGitDiffHeadPackageVersionChanges,
  patchPackageVersion
} from '#hooks/common'

const log = debug('@modernpoacher/hooks/post-commit')
const error = debug('@modernpoacher/hooks/post-commit:error')

log('`@modernpoacher/hooks` is awake')

export default async function postCommit () {
  log('postCommit')

  try {
    if (await hasStagedChanges()) return

    const originHeadBranch = await getGitRemoteShowOriginHeadBranch()

    if (originHeadBranch === await getGitRevParseAbbrevRefHead()) {
      if (await hasGitDiffHeadPackageVersionChanges(originHeadBranch)) return

      await patchPackageVersion()
    }
  } catch ({
    code = 'NONE',
    message = 'No error message defined'
  }) {
    error({ code, message })
  }
}
