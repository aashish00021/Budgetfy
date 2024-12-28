import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { deleteExpense } from '../store/expenseSlice'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface ExpenseProps {
  expense: {
    id: string;
    title: string;
    category: string;
    amount: number;
    tripId: string;
  }
}

export default function ExpenseCard({ expense }: ExpenseProps) {
  const dispatch = useDispatch();
  const { currency } = useSelector((state: RootState) => state.currency);
  
  const convertAmount = (amount: number): string => {
    const convertedAmount = amount * currency.rate;
    return convertedAmount.toFixed(2);
  }

  const handleDelete = () => {
    dispatch(deleteExpense({ tripId: expense.tripId, expenseId: expense.id }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{expense.title}</Text>
          <Text style={styles.category}>{expense.category}</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.amount}>{currency.symbol}{convertAmount(expense.amount)}</Text>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Icon name="delete-outline" size={20} color="#ff4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f8ff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  category: {
    color: 'grey',
  },
  amount: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 5,
  }
})