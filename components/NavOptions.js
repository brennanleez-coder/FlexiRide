import { FlatList, Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'
import { services as data } from '../data/Services'

const NavOptions = () => {
    const navigation = useNavigation()
    const origin = useSelector(selectOrigin)

  return (
    <FlatList
    data={data}
    horizontal
    keyExtractor={(item) => item.id}
    renderItem={({item}) => (
        <TouchableOpacity
        disabled={!origin}
        onPress={() => navigation.navigate(item.screen)}
        style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 shadow-md`}>
            <View style={!origin && tw`opacity-20`}>
                <Image
                style={{height: 120, width: 120, resizeMode: 'contain'}}
                source={{
                    uri: item.image
                }}/>
                <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                <Icon
                style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                name="arrowright"
                color="white"
                type="antdesign"
                />
            </View>
        </TouchableOpacity>
    )}
    />
    )
}

export default NavOptions
