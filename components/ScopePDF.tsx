import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { GeneratedScope } from "@/types";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 30,
  },
  brandLabel: {
    color: "#B8860B",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  projectTitle: {
    color: "#0B1D35",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    color: "#666666",
    fontSize: 10,
    marginBottom: 16,
  },
  divider: {
    borderBottom: 2,
    borderBottomColor: "#B8860B",
    marginBottom: 30,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#B8860B",
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  bulletList: {
    paddingLeft: 16,
  },
  bulletItem: {
    marginBottom: 6,
    color: "#333333",
  },
  textContent: {
    color: "#333333",
  },
  pricingContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  selectedPricingContainer: {
    border: "2 solid #B8860B",
    borderRadius: 4,
    padding: 20,
    textAlign: "center",
    backgroundColor: "#FFFAF0",
  },
  pricingColumn: {
    flex: 1,
    border: "1 solid #E0E0E0",
    borderRadius: 4,
    padding: 16,
    textAlign: "center",
  },
  pricingColumnStandard: {
    flex: 1,
    border: "2 solid #B8860B",
    borderRadius: 4,
    padding: 16,
    textAlign: "center",
    backgroundColor: "#FFFAF0",
  },
  pricingLabel: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  selectedPricingLabel: {
    fontSize: 12,
    color: "#B8860B",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "bold",
  },
  pricingAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0B1D35",
  },
  selectedPricingAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0B1D35",
  },
  pricingRationale: {
    fontStyle: "italic",
    color: "#666666",
    fontSize: 11,
    lineHeight: 1.6,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#999999",
    fontSize: 9,
  },
});

interface ScopePDFProps {
  scope: GeneratedScope;
  selectedTier: "conservative" | "standard" | "premium";
}

export default function ScopePDF({ scope, selectedTier }: ScopePDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brandLabel}>PRICIS</Text>
          <Text style={styles.projectTitle}>{scope.project_title}</Text>
          <Text style={styles.date}>
            Generated on {new Date().toLocaleDateString()}
          </Text>
          <View style={styles.divider} />
        </View>

        {/* Deliverables Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deliverables</Text>
          <View style={styles.bulletList}>
            {scope.deliverables.map((deliverable, index) => (
              <Text key={index} style={styles.bulletItem}>
                • {deliverable}
              </Text>
            ))}
          </View>
        </View>

        {/* Timeline Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          <Text style={styles.textContent}>{scope.timeline}</Text>
        </View>

        {/* Revision Policy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revision Policy</Text>
          <Text style={styles.textContent}>{scope.revision_policy}</Text>
        </View>

        {/* Out of Scope Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Out of Scope</Text>
          <View style={styles.bulletList}>
            {scope.out_of_scope.map((item, index) => (
              <Text key={index} style={styles.bulletItem}>
                • {item}
              </Text>
            ))}
          </View>
        </View>

        {/* Pricing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Pricing</Text>
          <View style={styles.selectedPricingContainer}>
            <Text style={styles.selectedPricingLabel}>
              {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1).toLowerCase()}
            </Text>
            <Text style={styles.selectedPricingAmount}>
              NGN 
              {selectedTier === "conservative"
                ? scope.price_conservative.toLocaleString()
                : selectedTier === "standard"
                ? scope.price_standard.toLocaleString()
                : scope.price_premium.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Pricing Rationale Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing Rationale</Text>
          <Text style={styles.pricingRationale}>{scope.pricing_rationale}</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Powered by Pricis — pricis.vercel.app
        </Text>
      </Page>
    </Document>
  );
}
