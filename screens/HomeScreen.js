import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import FlexiRideLogo from '../assets/FlexiRideLogo.png'
import NavOptions from '../components/NavOptions'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import NavFavourites from '../components/NavFavourites'
import { Icon } from 'react-native-elements'

const HomeScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
            <Image
            style={{
                width:100, height:100, resizeMode:'contain'
            }}
            source={FlexiRideLogo}
            />
            {/* Google places autocomplete component */}
            <GooglePlacesAutocomplete
            placeholder="Where from?"
            styles={{
                container: {
                    flex: 0,
                },
                textInput: {
                    fontSize: 18,
                }
            }}
            enablePoweredByContainer={false}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                dispatch(setOrigin({
                    location: details.geometry.location,
                    description: data.description,
                }))
                dispatch(setDestination(null))
            
            }}
            fetchDetails={true}
            query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            />

            <NavOptions/>
            <NavFavourites/>
        </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})