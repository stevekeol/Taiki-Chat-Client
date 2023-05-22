
// type Props = {
//     size: number;
//     index: number;
//     style?: any;
// };

// export function LinearGradient1({ size, index, style }: Props) {
//     return (
//         <View
//             style={[{ width: size, height: size, overflow: 'hidden' }, style]}
//         >
//             <Image
//                 src={uri}
//                 width={size}
//                 height={(size * 3200) / 64}
//                 style={{ marginTop: -size * index }}
//             />
//         </View>
//     );
// }

//@TODO 背景渐变色
// #FF0080#7928CA; #21D4FD#2152FF; #FF667C#EA0606

import { LinearGradient as BaseLinearGradient } from 'react-native-linear-gradient'
import { Text, StyleSheet, SafeAreaView } from 'react-native';

type Props = any

export default function LinearGradient({ children }: Props) {
    <BaseLinearGradient
        colors={['#e61a0f', '#db7029']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
            height:36,
            width:90,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:18
        }}
        locations={[0, 0.75]}
    >
        { children }
    </BaseLinearGradient>
}

const styles = StyleSheet.create({
    //
});