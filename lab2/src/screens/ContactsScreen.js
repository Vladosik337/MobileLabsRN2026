import React from 'react';
import { SectionList, SafeAreaView, StyleSheet } from 'react-native';
import { ContactItem, SectionHeader, ItemSeparator } from '../components';
import { contactsData } from '../data';

const ContactsScreen = () => {
  const renderItem = ({ item }) => <ContactItem item={item} />;

  const renderSectionHeader = ({ section: { title } }) => (
    <SectionHeader title={title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={contactsData}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeparator}
        stickySectionHeadersEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default ContactsScreen;
