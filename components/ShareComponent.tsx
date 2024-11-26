import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Dispatch, useEffect, useState } from 'react';

interface Props {
    setEmailShare: React.MutableRefObject<string>;
    setPermission: React.MutableRefObject<boolean>;
}
const ShareComponent = ({ setEmailShare, setPermission }: Props) => {
    const [textEmailShare, setTextEmailShare] = useState<string>('');
    const [readPermission, setReadPermission] = useState<boolean>(true);
    const [editPermission, setEditPermission] = useState<boolean>(false);


    const toggleReadPermission = () => {
        setReadPermission(true);
        setEditPermission(false);
        setPermission.current = true; 
    };

    const toggleEditPermission = () => {
        setReadPermission(false);
        setEditPermission(true);
        setPermission.current = false; 
    };
    useEffect(() => {
        setEmailShare.current =textEmailShare;
    }, [textEmailShare]);

    return (
        <View style={{ width: '100%' }}>
            <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: '600' }}>Chia sẻ lịch trình</Text>

            <TextInput
                placeholder="Nhập email..."
                style={styles.input}
                value={textEmailShare}
                onChangeText={(text) => setTextEmailShare(text)}
            />

            <View style={{ marginTop: 16 }}>
                <View style={styles.permissionContainer}>
                    <TouchableOpacity onPress={toggleReadPermission} style={styles.checkboxContainer}>
                        <View
                            style={[styles.checkbox, readPermission ? styles.checked : styles.unchecked]}>
                            {readPermission && <Text style={styles.checkmark}>✔</Text>}
                        </View>
                        <Text style={styles.label}>Xem</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleEditPermission} style={styles.checkboxContainer}>
                        <View
                            style={[styles.checkbox, editPermission ? styles.checked : styles.unchecked]}>
                            {editPermission && <Text style={styles.checkmark}>✔</Text>}
                        </View>
                        <Text style={styles.label}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

// Style cho checkbox
const styles = StyleSheet.create({
    input: {
        borderColor: '#B0BEC5',
        borderWidth: 1,
        width: 250,
        borderRadius: 8,
        paddingLeft: 16,
        paddingVertical: 8,
        marginTop: 10,
        fontSize: 16,
    },
    permissionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checked: {
        backgroundColor: 'black',
        borderColor: 'white',
    },
    unchecked: {
        backgroundColor: 'transparent',
        borderColor: '#B0BEC5',
    },
    checkmark: {
        color: 'white',
        fontSize: 18,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
});

export default ShareComponent;