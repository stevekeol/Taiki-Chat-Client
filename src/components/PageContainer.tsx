import { View } from 'native-base';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';

type Props = {
    children: any;
    disableSafeAreaView?: boolean;
};


// 要设置背景图
function PageContainer({ children, disableSafeAreaView = false }: Props) {
    return (
        <ImageBackground
            source={require('../assets/images/black.jpg')}
            style={styles.backgroundImage}
            blurRadius={0}
        >
            <View style={styles.children}>
                {disableSafeAreaView ? (
                    children
                ) : (
                    <SafeAreaView style={[styles.container]}>
                        {children}
                    </SafeAreaView>
                )}
            </View>
        </ImageBackground>
    );
}

// 不要背景图
// function PageContainer({ children, disableSafeAreaView = false }: Props) {
//     return (
//         <View style={styles.children}>
//             {disableSafeAreaView ? (
//                 children
//             ) : (
//                 <SafeAreaView style={[styles.container]}>
//                     {children}
//                 </SafeAreaView>
//             )}
//         </View>
//     );
// }

export default PageContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        // resizeMode: 'cover',
        // resizeMode: 'stretch',
        // resizeMode: 'repeat',
    },
    children: {
        flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, 0)',
    },
});
