const axios = require('axios')
axios.interceptors.request.use( x => {
    // to avoid overwriting if another interceptor
    // already defined the same object (meta)
    x.meta = x.meta || {}
    x.meta.requestStartedAt = new Date().getTime();
    return x;
})
const getBreeds = () => {
  try {
    return axios.get('https://dog.ceo/api/breeds/list/all')
  } catch (error) {
    console.error(error)
  }
}

const countBreeds = async () => {
  const breeds = getBreeds()
    .then(response => {
      if (response.data.message) {
       //   console.log(response);
        console.log(
          `Got ${Object.entries(response.data.message).length} breeds`
        )
      }
    })
    .catch(error => {
      console.log(error)
    })
}

const getBreeds1 = () => {
    try {
      return axios.get('https://amazon.com')
    } catch (error) {
      console.error(error)
    }
  }
  
  const countBreeds1 = async () => {
    const breeds = getBreeds1()
      .then(response => {
        if (response.data.message) {
         //   console.log(response);
          console.log(
            `Got ${Object.entries(response.data).length} breeds`
          )
        }
      })
      .catch(error => {
        console.log(error)
      })
  }



axios.interceptors.response.use(x => {
    console.log(`Execution time for: ${x.config.url} - ${new Date().getTime() - x.config.meta.requestStartedAt} ms`)
    return x;
},
// Handle 4xx & 5xx responses
x => {
    console.error(`Execution time for: ${x.config.url} - ${new Date().getTime() - x.config.meta.requestStartedAt} ms`)
    throw x;
}
)

countBreeds()
countBreeds1()
