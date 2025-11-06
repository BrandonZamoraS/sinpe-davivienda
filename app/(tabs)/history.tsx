import React, { useState } from "react";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Transaction, User } from "@/types";
import { mockTransactions, mockUser } from "@/utils/mockData";

export default function HistoryScreen() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"credit" | "debit" | null>(null);
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const user: User = mockUser;

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const filteredTransactions = mockTransactions.filter((item) => {
    const matchesType =
      !filterType ||
      (filterType === "credit" && item.type === "receive") ||
      (filterType === "debit" && item.type === "send");
    const matchesDate =
      !filterDate ||
      item.date.toLocaleDateString() === filterDate.toLocaleDateString();
    return matchesType && matchesDate;
  });

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setFilterDate(selectedDate);
  };

  const clearFilters = () => {
    setFilterType(null);
    setFilterDate(null);
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Últimos Movimientos</Text>
        <Text style={styles.headerSubtitle}>
          {user.phoneNumber} - {user.name}
        </Text>
      </View>

      <View style={styles.filtersRow}>
        {showDatePicker && (
          <DateTimePicker
            value={filterDate || new Date()}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
          />
        )}
        <View style={styles.filterButtons}>
          <Pressable
            style={[
              styles.typeButton,
              filterType === "credit" && styles.activeButton,
            ]}
            onPress={() => setFilterType("credit")}
          >
            <Icon
              name="arrow-downward"
              size={16}
              color={filterType === "credit" ? "#fff" : "#dd141d"}
            />
            <Text
              style={[
                styles.typeText,
                filterType === "credit" && styles.activeText,
              ]}
            >
              Créditos
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.typeButton,
              filterType === "debit" && styles.activeButton,
            ]}
            onPress={() => setFilterType("debit")}
          >
            <Icon
              name="arrow-upward"
              size={16}
              color={filterType === "debit" ? "#fff" : "#dd141d"}
            />
            <Text
              style={[
                styles.typeText,
                filterType === "debit" && styles.activeText,
              ]}
            >
              Débitos
            </Text>
          </Pressable>
        </View>

        {/* Fecha expandible */}
        <Pressable
          style={[styles.dateButton, { flex: 1, marginHorizontal: 6 }]}
          onPress={() => setShowDatePicker(true)}
        >
          <Icon name="calendar-today" size={18} color="#dd141d" />
          <Text style={styles.dateText}>
            {filterDate ? filterDate.toLocaleDateString() : "Fecha"}
          </Text>
        </Pressable>

        <Pressable style={styles.clearButton} onPress={clearFilters}>
          <Icon name="close" size={18} color="#fff" />
        </Pressable>
      </View>

      {/* Lista */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isExpanded = expanded === item.id;
          return (
            <View
              style={[
                styles.cardContainer,
                isExpanded && styles.cardContainerExpanded,
              ]}
            >
              <Pressable
                onPress={() => toggleExpand(item.id)}
                style={[styles.topCard, isExpanded && styles.topCardExpanded]}
              >
                <View>
                  <Text style={styles.amount}>
                    ₡{item.amount.toLocaleString()}
                  </Text>
                  <Text>
                    Teléfono:{" "}
                    {item.recipient?.phoneNumber ?? item.sender?.phoneNumber}
                  </Text>
                  <Text>Fecha: {item.date.toLocaleDateString()}</Text>
                </View>

                <View style={styles.rightSide}>
                  <Text style={styles.type}>
                    {item.type === "receive" ? "Crédito" : "Débito"}
                  </Text>
                  <Icon
                    name={
                      isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"
                    }
                    size={26}
                    color="#000"
                  />
                </View>
              </Pressable>

              {isExpanded && (
                <View style={styles.bottomCard}>
                  <View style={styles.info}>
                    <Text>
                      Hora:{" "}
                      {item.date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                    <Text>Descripción: {item.description}</Text>
                    <Text>Referencia: {item.reference}</Text>
                  </View>
                  <View style={styles.downloadSection}>
                    <Pressable
                      style={styles.downloadButton}
                      onPress={() => console.log("Download", item.id)}
                    >
                      <Icon name="file-download" size={20} color="#fff" />
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          );
        }}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#777", marginTop: 40 }}>
            No hay movimientos con ese filtro.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  headerTitle: { fontSize: 17, fontWeight: "bold", color: "#000" },
  headerSubtitle: { marginTop: 3, color: "#444", fontSize: 13 },

  filtersRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  filterButtons: {
    flexDirection: "row",
    gap: 6,
  },
  typeButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dd141d",
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  typeText: {
    marginLeft: 4,
    color: "#dd141d",
    fontSize: 12,
    fontWeight: "600",
  },
  activeButton: { backgroundColor: "#dd141d" },
  activeText: { color: "#fff" },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  dateText: { marginLeft: 4, fontSize: 12, color: "#000" },
  clearButton: {
    backgroundColor: "#777",
    padding: 6,
    borderRadius: 6,
  },

  container: { padding: 14 },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    overflow: "hidden",
  },
  cardContainerExpanded: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  topCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  topCardExpanded: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  rightSide: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 55,
  },
  type: { fontWeight: "bold", color: "#dd141d", fontSize: 13 },
  amount: { fontWeight: "bold", marginBottom: 2 },
  bottomCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  info: { flex: 3 },
  downloadSection: { flex: 1, alignItems: "center", justifyContent: "center" },
  downloadButton: {
    backgroundColor: "#dd141d",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
});
