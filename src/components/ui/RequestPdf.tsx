/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { RequestedItems } from "@/lib/types/requestItem";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Ubuntu",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Ubuntu",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFF",
    padding: 40,
  },
  image: {
    width: 200,
  },
  requestCode: {
    fontSize: 12,
    color: "#00B0F0",
  },
  requestName: {
    fontSize: 14,
    color: "#000",
    fontWeight: 500,
  },
});

export default function RequestPdf({ request }: { request: RequestedItems }) {
  const createdAt = new Date(request?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Image
            style={styles.image}
            src="https://res.cloudinary.com/dxxgiqzhc/image/upload/v1715752754/Logo_Baru_HP_dkptlf.png"
          />
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexDirection: "row",
              marginTop: 12,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Text style={styles.requestCode}>Request #{request.code}</Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#000",
                  fontWeight: 500,
                  marginTop: 6,
                }}
              >
                From: #{request.requester.name}
              </Text>
              <Text style={styles.requestName}>
                Into: #{request.requested.name}
              </Text>
            </View>
            <View
              style={{
                textAlign: "right",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#00B0F0",
                  textTransform: "uppercase",
                }}
              >
                {request.type} REQUEST
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {createdAt}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <View>
            <Text
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 14,
                fontWeight: 600,
                color: "#00B0F0",
              }}
            >
              Reason of Request
            </Text>
            <Text
              style={{
                fontSize: 12,
              }}
            >
              {request.reason}
            </Text>
          </View>

          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 12,
                fontWeight: 600,
                color: "#00B0F0",
              }}
            >
              Detailed Reason
            </Text>
            <Text
              style={{
                fontSize: 12,
              }}
            >
              {request.detail}
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              fontSize: 10,
              textAlign: "center",
              marginTop: 20,
              fontWeight: 600,
            }}
          >
            <Text
              style={{
                backgroundColor: "#232729",
                padding: "6px 20px",
                color: "#fff",
                width: "10%",
              }}
            >
              NO.
            </Text>
            <Text
              style={{
                backgroundColor: "#00B0F0",
                padding: "6px",
                color: "#000",
                width: "40%",
              }}
            >
              {request.type === "material" ? "MATERIAL" : "TOOL"}
            </Text>
            <Text
              style={{
                backgroundColor: "#00B0F0",
                padding: "6px",
                color: "#000",
                width: "30%",
              }}
            >
              SKU
            </Text>
            <Text
              style={{
                backgroundColor: "#00B0F0",
                padding: "6px 20px",
                color: "#000",
                width: "20%",
              }}
            >
              QTY
            </Text>
          </View>
          {request.items.map((item, index) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                fontSize: 10,
                textAlign: "center",
                paddingVertical: 12,
                backgroundColor: "#f5f8ff",
                gap: 2,
              }}
            >
              <Text
                style={{
                  width: "10%",
                }}
              >
                {index + 1}
              </Text>
              <Text
                style={{
                  width: "40%",
                }}
              >
                {item.material.name}
              </Text>
              <Text
                style={{
                  width: "30%",
                }}
              >
                {item.material.sku}
              </Text>
              <Text
                style={{
                  width: "20%",
                }}
              >
                {item.quantity}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 28,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
            }}
          >
            <Text
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              Item Type :
              <Text
                style={{
                  fontWeight: 600,
                }}
              >
                {" "}
                {request.items.length}
              </Text>
            </Text>
            <Text
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              Total Quantity :
              <Text
                style={{
                  fontWeight: 600,
                }}
              >
                {" "}
                {request.items.reduce((acc, item) => acc + item.quantity, 0)}
              </Text>
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 12,
            }}
          >
            <View
              style={{
                width: 110,
                height: 1,
                backgroundColor: "#1d1b1b",
                marginTop: 64,
              }}
            />
            <Text
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              Penanggung Jawab
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
