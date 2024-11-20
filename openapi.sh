#!/bin/bash

paths=$(find ./pages/api -type f)

echo "{
  \"openapi\": \"3.0.0\",
  \"info\": {
    \"title\": \"API Endpoints\",
    \"version\": \"1.0.0\",
    \"description\": \"Dokumentasi API.\"
  },
  \"servers\": [
    {\"url\": \"https://api.example.com\", \"description\": \"Server utama\"}
  ],
  \"paths\": {" > ./pages/api/endpoint.json

for path in $paths; do
    endpoint=$(echo "$path" | sed 's|./pages/api||' | sed 's|\.js$||' | sed 's|^/||')
    endpoint="/api/$endpoint"
    tag=$(echo "$endpoint" | cut -d'/' -f3 | tr 'a-z' 'A-Z')
    summary=$(echo "$endpoint" | sed 's|/| |g' | sed 's/\b\(.\)/\U\1/g')
    description="Endpoint ini untuk mengambil data $summary."
    operationId=$(echo "$endpoint" | sed 's|/| |g' | tr -s ' ' '_' | tr '[:upper:]' '[:lower:]')

    echo "    \"$endpoint\": {
      \"get\": {
        \"summary\": \"$summary\",
        \"description\": \"$description\",
        \"operationId\": \"$operationId\",
        \"tags\": [\"$tag\"],
        \"parameters\": [],
        \"responses\": {
          \"200\": {
            \"description\": \"Permintaan berhasil\",
            \"content\": {
              \"application/json\": {
                \"schema\": {
                  \"type\": \"object\",
                  \"properties\": {
                    \"message\": {\"type\": \"string\", \"example\": \"Sukses\"}
                  }
                }
              }
            }
          },
          \"400\": {\"description\": \"Permintaan tidak valid\"},
          \"500\": {\"description\": \"Kesalahan server\"}
        }
      }
    }," >> ./pages/api/endpoint.json
done

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' '$ s/,$//' ./pages/api/endpoint.json
else
  sed -i '$ s/,$//' ./pages/api/endpoint.json
fi

echo "  }
}" >> ./pages/api/endpoint.json

echo "File endpoint.json berhasil dibuat."
