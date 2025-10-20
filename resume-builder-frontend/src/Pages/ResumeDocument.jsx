// ResumeDocument.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Basic styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contact: {
    marginBottom: 10,
  },
  content: {
    marginTop: 10,
  },
});

const ResumeDocument = ({ data }) => {
  if (!data) return null;

  const { name, email, phone, summary, experience = [], education = [] } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.contact}>{email} | {phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Summary</Text>
          <Text>{summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Experience</Text>
          {experience.map((job, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold' }}>{job.title} - {job.company}</Text>
              <Text>{job.startDate} - {job.endDate || 'Present'}</Text>
              <Text>{job.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Education</Text>
          {education.map((school, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold' }}>{school.degree} - {school.institution}</Text>
              <Text>{school.startDate} - {school.endDate || 'Present'}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ResumeDocument;
