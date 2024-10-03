import React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect ,Ellipse ,Circle,} from 'react-native-svg';
import { Text,View } from 'react-native';

export const GoogleIcon=({size}:any)=>(
  <Svg height={size} viewBox="0 0 24 24" width={size}>
  <Path
    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    fill="#4285F4"
  />
  <Path
    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    fill="#34A853"
  />
  <Path
    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    fill="#FBBC05"
  />
  <Path
    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    fill="#EA4335"
  />
  <Path d="M1 1h22v22H1z" fill="none"/>
</Svg>
)



export const AppleIcon = ({ size = 20 ,color}:any) => (
  <Svg
  width={size}
  height={size}
  viewBox="0 0 50 50"
>
  <Path
    d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"
    fill={color} // 흰색으로 변경
  />
</Svg>
);


export const Logo=({color}:any)=>(
  <Svg  width="64" height="40" viewBox="0 0 64 40" fill="none">
<Path fill-rule="evenodd" clip-rule="evenodd" d="M32 36.0015C36.8578 32.3526 40 26.5433 40 20C40 13.4567 36.8578 7.64736 32 3.99854C35.3426 1.48778 39.4976 0 44 0C55.0457 0 64 8.9543 64 20C64 31.0457 55.0457 40 44 40C39.4976 40 35.3426 38.5122 32 36.0015ZM32 36.0015C28.6574 38.5122 24.5024 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C24.5024 0 28.6574 1.48778 32 3.99854C27.1422 7.64736 24 13.4567 24 20C24 26.5433 27.1422 32.3526 32 36.0015Z" fill={color}/>
<Path fill-rule="evenodd" clip-rule="evenodd" d="M32 36.0015C36.8578 32.3526 40 26.5433 40 20C40 13.4567 36.8578 7.64736 32 3.99854C35.3426 1.48778 39.4976 0 44 0C55.0457 0 64 8.9543 64 20C64 31.0457 55.0457 40 44 40C39.4976 40 35.3426 38.5122 32 36.0015ZM32 36.0015C28.6574 38.5122 24.5024 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C24.5024 0 28.6574 1.48778 32 3.99854C27.1422 7.64736 24 13.4567 24 20C24 26.5433 27.1422 32.3526 32 36.0015Z" fill={color}/>
</Svg>




)





export const HeaderL = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill={props.color}
        d="M16 2.75v2.5A1.75 1.75 0 0 1 14.25 7H1.75A1.75 1.75 0 0 1 0 5.25v-2.5A1.75 1.75 0 0 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75Zm0 8v2.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25v-2.5A1.75 1.75 0 0 1 1.75 9h12.5c.966 0 1.75.784 1.75 1.75ZM14.25 2.5H1.75a.25.25 0 0 0-.25.25v2.5a.25.25 0 0 0 .25.25h12.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25Zm0 8H1.75a.25.25 0 0 0-.25.25v2.5a.25.25 0 0 0 .25.25h12.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={props.color} d="M16 0v16H0V0z" />
      </ClipPath>
    </Defs>
  </Svg>
)






export const MainLogo = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={60}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color} // 전달받은 color props를 여기에서 사용하여 색을 동적으로 적용
      fillRule="evenodd"
      d="M60 30c0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0c16.569 0 30 13.431 30 30Zm-5.455 0c0 13.556-10.989 24.545-24.545 24.545C16.444 54.545 5.455 43.556 5.455 30h49.09Z"
      clipRule="evenodd"
    />
  </Svg>
);






