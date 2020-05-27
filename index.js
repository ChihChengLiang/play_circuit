const compiler = require('circom')
const { Circuit, groth } = require('snarkjs')
const { setup, genProof } = groth
const path = require('path')

const compileAndLoadCircuit = async circuitPath => {
  const circuitDef = await compiler(
    path.join(__dirname, 'circuits', circuitPath)
  )
  return new Circuit(circuitDef)
}

const calculateWitness = (circuit, inputs) => {
  const witness = circuit.calculateWitness(inputs)
  return witness
}

const main = async () => {
  const circuit = await compileAndLoadCircuit('multiplier.circom')
  const inputs = { a: -1, b: 4 }
  const witness = calculateWitness(circuit, inputs)
  console.log(witness)
  // [ 1n, -4n, -1n, 4n ]

  // const _setup = setup(circuit)
  // const { publicSignals } = genProof(_setup.vk_proof, witness)
  // console.log(publicSignals)
}
main()
