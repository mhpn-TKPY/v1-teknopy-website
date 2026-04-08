#!/bin/bash

# Script de test du système de formulaire de contact
# Utilisation: bash test-contact.sh

BASE_URL="${1:-http://localhost:3000}"
TEST_EMAIL="test@example.com"
TEST_NAME="Test User"
TEST_MESSAGE="Ceci est un message de test"
TEST_SERVICE="Site Web Vitrine"

echo "🧪 Démarrage des tests du formulaire de contact"
echo "Base URL: $BASE_URL"
echo ""

# Test 1: Soumettre un formulaire
echo "📝 Test 1: Soumission du formulaire"
RESPONSE=$(curl -s -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"$TEST_NAME\",
    \"email\": \"$TEST_EMAIL\",
    \"phone\": \"+596 696 123456\",
    \"service\": \"$TEST_SERVICE\",
    \"message\": \"$TEST_MESSAGE\"
  }")

echo "Réponse: $RESPONSE"
echo ""

# Extraire le contact ID si disponible
CONTACT_ID=$(echo "$RESPONSE" | grep -o '"contactId":"[^"]*' | cut -d'"' -f4)

if [ -z "$CONTACT_ID" ]; then
  echo "⚠️ Impossible d'extraire le contactId"
else
  echo "✅ Contact ID: $CONTACT_ID"
fi

echo ""
echo "📧 Vérifiez votre email à $TEST_EMAIL pour le lien de vérification"
echo "⏱️ Le lien expire dans 24 heures"
