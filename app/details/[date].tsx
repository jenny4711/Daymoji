import { View, Text } from 'react-native'
import React from 'react'
import Head from 'expo-router/head'
import { useLocalSearchParams } from 'expo-router'

export async function generateStaticParams():Promise<Record<string,string>[]>{
return [
  {date:'2022-01-01'},
  {date:'2022-01-02'},
  {date:'2022-01-03'},
  {date:'2022-01-04'},
]
}
const Detail = () => {
  const { date }:any = useLocalSearchParams()
  return (
    <>
 <Head>
      <title>My details for {date}</title>
      <meta name="description" content="Index" />
    </Head>

    <View>
      <Text> Detail</Text>
    </View>
    </>
  )
}

export default Detail