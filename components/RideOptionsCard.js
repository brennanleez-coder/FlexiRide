import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'
import { calculate_fare } from '../algorithms/PricingAlgorithm'
import { rideOptions as data} from '../data/RideOptionsData'

const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [selected, setSelected] = React.useState(null)
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    
    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                onPress={() => navigation.navigate("NavigateCard")}
                style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance.text}</Text>
            </View>
            <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item: {id, title, multiplier, image}, item}) => (
                <TouchableOpacity
                onPress={() => setSelected(item)}
                style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}>
                    <Image
                    style={{
                        width: 90,
                        height: 90,
                        resizeMode: "contain",
                    }}
                    source={{uri: image}}
                    />
                    <View style={tw`-ml-6`}>
                        <Text style={tw`text-sm font-semibold`}>{title}</Text>
                        <Text style={tw`text-center`}>~{travelTimeInformation?.duration.text}</Text>
                    </View>
                    <Text style={tw`text-lg`}>
                        {
                            new Intl.NumberFormat('en-gb', {
                                style: 'currency',
                                currency: 'SGD',
                            }).format(
                                calculate_fare(travelTimeInformation?.duration.value, multiplier)
                            )

                        }
                    </Text>
                </TouchableOpacity>

            )}
            />
            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}



export default RideOptionsCard

const styles = StyleSheet.create({})