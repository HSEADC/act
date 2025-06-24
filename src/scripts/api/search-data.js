import Airtable from 'airtable'

const token =
  'patlLEe7VrYSPTTLs.36f4057f9387ca6a96fe4ac45e3d9d9d9ccd99467f9a1911827512ec99ffc098'

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: token
})
var base = Airtable.base('appaauWFx5iDmp1lg')

function getPostTeasers() {
  return new Promise((resolve, reject) => {
    const content = []

    base('teasers')
      .select({ maxRecords: 100 })
      .firstPage()
      .then((result) => {
        result.forEach((record) => {
          content.push({
            id: record.id,
            title: record.fields['Title'],
            image: record.fields['Preview']?.[0]?.url || '',
            url: record.fields['URL'],
            type: record.fields['Type']
          })
        })

        resolve(content)
      })
  })
}

export { getPostTeasers }
