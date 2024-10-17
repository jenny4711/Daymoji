import { View, Text , Platform,StyleSheet} from 'react-native';
import React from 'react';
import { useTheme } from '~/Theme/ThemeProvider';
import * as WebBrowser from 'expo-web-browser';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { throttle } from 'lodash';
import { GoogleIcon } from '~/utils/Icons';
import Head from 'expo-router/head';
interface LoginProps{
  promptAsync:()=>void

}
if(Platform.OS !== 'web'){
  WebBrowser.maybeCompleteAuthSession();




}


const Login:React.FC<LoginProps> = ({promptAsync}) => {
 const {colors}=useTheme()
 
 const handleGoogleLogin =throttle (async () => {
  try {
    const result = await promptAsync();
    console.log(result,'result')
   
  } catch (error) {
    console.error('Error during login:', error);
  }
});

  return (
    <>
     <Head>
      <title>Daymoji Login</title>
      <meta name="description" content="Index" />
    </Head>
   
    <View>
      <TouchableOpacity style={[styles.googleBtn,{backgroundColor:colors.text}]} onPress={()=>handleGoogleLogin ()} >
        <GoogleIcon size={24}/>
      <Text style={{ color: colors.background ,marginLeft:8,fontSize:16,fontFamily:"SFCompactRoundedBD",lineHeight:19}}>Sign up with Google</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  googleBtn: { 
    marginTop:25,
    // backgroundColor: 'black', 
    width:345,
    height: 70,
    borderRadius: 24, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})