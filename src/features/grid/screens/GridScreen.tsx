import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Switch } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { gridRepository } from '@/api/repositories/grid';
import { Footer } from '@/components/ui/Footer';
import { Logo } from '@/components/shared/Logo';
import { Filters } from '../components/Filters';
import { GridData, Filters as FilterType } from '../types';
import { colors } from '@/utils/constants/colors';
import { safeNavigate } from '@/utils/navigation';
import { routes } from '@/utils/constants/routes';

export default function GridScreen() {
    const [data, setData] = useState<GridData[]>([]);
    const [filters, setFilters] = useState<FilterType>({
        col1: '',
        col2: '',
        col3: false,
        col4: '',
        col5: new Date(),
    });
    const [isFilterVisible, setFilterVisible] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await gridRepository.fetchData();
            setData(result);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    };

    const filteredData = data.filter((item) => (
        item.col1.toLowerCase().includes(filters.col1.toLowerCase()) &&
        item.col2.toLowerCase().includes(filters.col2.toLowerCase()) &&
        (filters.col3 === item.col3 || !filters.col3) &&
        item.col4.toLowerCase().includes(filters.col4.toLowerCase())
    ));

    const toggleFilter = () => {
        setFilterVisible(!isFilterVisible);
    };

    const renderItem = ({ item }: { item: GridData }) => (
        <TouchableOpacity
            style={styles.gridItem}
            onPress={() => safeNavigate(routes.CAMERA)}
            activeOpacity={0.7}
        >
            <Text style={styles.cell}>{item.col1}</Text>
            <Text style={styles.cell}>{item.col2}</Text>
            <Switch
                value={item.col3}
                onValueChange={(value) => {
                    setData((prev) =>
                        prev.map((d) => (d.id === item.id ? { ...d, col3: value } : d))
                    );
                }}
                style={styles.cell}
            />
            <Text style={styles.cell}>{item.col4}</Text>
            <Text style={styles.cell}>{item.col5.toLocaleDateString()}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Logo />
            <TouchableOpacity style={styles.filterButton} onPress={toggleFilter}>
                <Text style={styles.filterButtonText}>
                    {isFilterVisible ? 'Скрыть фильтр' : 'Показать фильтр'}
                </Text>
            </TouchableOpacity>

            {isFilterVisible && <Filters filters={filters} setFilters={setFilters} />}

            <FlatGrid
                itemDimension={300} // Adjust this to control item width
                data={filteredData}
                renderItem={renderItem}
                style={styles.grid}
                spacing={10} // Space between items
                keyExtractor={(item) => item.id}
            />
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    filterButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    filterButtonText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
    },
    grid: {
        flex: 1,
    },
    gridItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: colors.white,
        borderRadius: 8,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 3,
    },
    cell: {
        flex: 1,
        marginHorizontal: 4,
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: colors.text,
    },
});