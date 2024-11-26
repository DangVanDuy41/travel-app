import { Text, View, StyleSheet } from 'react-native';

interface Props {
    starRating: number; 
    setStarRating?: (rating: number) => void; 
    size?: number; 
}

const StarRating = ({ starRating, setStarRating, size }: Props) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Text
                key={i}
                style={i <= starRating ? { ...styles.starSelected, fontSize: size } : { ...styles.star, fontSize: size }} // Sử dụng size
                onPress={() => {
                    if (setStarRating) {
                        setStarRating(i); 
                    }
                }}
            >
                ★
            </Text>
        );
    }

    return <View style={styles.starContainer}>{stars}</View>; 
};

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
    },
    star: {
        color: '#ccc', 
        marginHorizontal: 2,
    },
    starSelected: {
        color: '#f39c12', 
        marginHorizontal: 2, 
    },
});

export default StarRating;